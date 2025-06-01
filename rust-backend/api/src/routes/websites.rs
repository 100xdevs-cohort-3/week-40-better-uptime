use crate::{error::AppError, AppState};
use poem::web::{Data, Json};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};
use uuid::Uuid;


#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateWebsite {
    url: String,
    #[oai(skip)]
    user_id: Uuid
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
        body: Json<CreateWebsite>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateWebsiteResponse>, AppError> {

        let url = body.0.url;
        let id = body.0.user_id;
        state.db.create_website(url.clone(), id).await?;
        Ok(payload::Json(CreateWebsiteResponse {
            status: 200,
            message: "Website created successfully".to_string(),
        }))
    }
}