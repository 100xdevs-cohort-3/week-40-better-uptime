use std::collections::HashMap;

use crate::{error::AppError, middleware::user::{UserId}, AppState};
use chrono::Local;
use poem::{web::{Data, Json}, Request};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use process_queue::{ QueueData, QueueDataProcessingStatus};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateWebsite {
    url: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct CreateWebsiteResponse {
    status: u8,
    message: String,
}

pub struct WebsiteApi;

#[OpenApi]
impl WebsiteApi {
    #[oai(path = "/new", method = "post")]
    async  fn crate_new_website(
        &self,
        req: &Request,
        body: Json<CreateWebsite>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateWebsiteResponse>, AppError> {

        let url = body.0.url.clone();
        let user_id_str = req
            .extensions()
            .get::<UserId>()
            .ok_or(AppError::Unauthorized(payload::Json(crate::error::ErrorBody {
                message: "Unauthorized user".to_string(),
            })))?;

        // Parsing user_id into `Uuid`
        let user_id = Uuid::parse_str(&user_id_str.0.clone())
            .map_err(|_| AppError::BadRequest(payload::Json(crate::error::ErrorBody {
                message: "Unauthorized user".to_string(),
            })))?;

        let website = state.db.create_website(url.clone(), user_id).await?;
        let queue_data = QueueData::new(
            body.0.url.clone(),
            website.user_id.to_string(),
            website.id.to_string(),
            QueueDataProcessingStatus::Pending
        );
        let mut map : HashMap<String, QueueData> = HashMap::new();
        let timestamp = Local::now().to_rfc3339(); // converting timestamp into string
        map.insert( timestamp, queue_data);
        let mut queue = state.queue.lock().unwrap();
        queue.push_site(map);        

        Ok(payload::Json(CreateWebsiteResponse {
            status: 200,
            message: "Website created successfully".to_string(),
        }))
    }
}