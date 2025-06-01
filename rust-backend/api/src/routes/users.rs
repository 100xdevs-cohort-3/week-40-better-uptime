use std::env;
use crate::{error::AppError, AppState};
use jsonwebtoken::{encode, Header};
use poem::web::{Data, Json};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateUser {
    email: String,
    name: String,
    password: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct CreateUserResponse {
    status: u8,
    message: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SignInRequest {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SignInResponse {
    status: u8,
    token: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,
    exp: usize,
}

pub struct UserApi;

#[OpenApi]
impl UserApi {
    #[oai(path = "/signup", method = "post")]
    async fn create_user(
        &self,
        body: Json<CreateUser>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateUserResponse>, AppError> {

        let name = body.0.name;
        let email = body.0.email;
        let password = body.0.password;

        state
            .db
            .create_user(email.clone(), name.clone(), password.clone())
            .await
            .map_err(|_| {
                AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to create user".to_string(),
                }))
            })?;

        Ok(payload::Json(CreateUserResponse {
            message: "User created successfully".to_string(),
            status: 200,
        }))
    }
    // Sign the user
    #[oai(path = "/signin", method = "post")]
    async fn sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {

        let email = body.0.email;
        let password = body.0.password;

        let _user = state
            .db
            .login_user(email.clone(), password.clone())
            .await
            .map_err(|_| {
                AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Can't Login".to_string(),
                }))
            })?;

        let secret = env::var("SECRET").unwrap_or_else(|_| "admin".to_string());

        let encoding_key = jsonwebtoken::EncodingKey::from_secret(secret.as_ref());
        let claims = Claims {
            sub: _user.id.to_string(),
            exp: (chrono::Utc::now() + chrono::Duration::hours(24 * 30)).timestamp() as usize,
        };

        let token = encode(&Header::default(), &claims, &encoding_key).map_err(|_| {
            AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                message: "Failed to generate JWT".to_string(),
            }))
        })?;

        Ok(payload::Json(SignInResponse {
            status: 200,
            token: token,
        }))
    }
}
