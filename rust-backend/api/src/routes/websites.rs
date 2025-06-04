use crate::{error::AppError, middleware::user::{UserId}, AppState};
use poem::{web::{Data, Json}, Request};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};
use uuid::Uuid;


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

        let url = body.0.url;
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

        state.db.create_website(url.clone(), user_id).await?;
        
        Ok(payload::Json(CreateWebsiteResponse {
            status: 200,
            message: "Website created successfully".to_string(),
        }))
    }
}