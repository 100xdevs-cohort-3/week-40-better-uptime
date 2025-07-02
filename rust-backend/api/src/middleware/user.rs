use poem:: {middleware::Middleware, http::StatusCode, Endpoint};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};
use log::info;

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,
    exp: usize,
}

#[derive(Debug, Clone)]
pub struct UserId(pub String);
pub struct AuthMiddleware {
    jwt_secret: String,
}

impl AuthMiddleware {
    pub fn new(jwt_secret: String) -> Self {
        Self { jwt_secret: jwt_secret }
    }
}

impl<E: Endpoint> Middleware<E> for AuthMiddleware {
    type Output = AuthMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        AuthMiddlewareImpl { 
            ep,
            jwt_secret: self.jwt_secret.clone(),
        }
    }
}
pub struct AuthMiddlewareImpl<E> {
    ep: E,
    jwt_secret: String,
}

impl<E: Endpoint> Endpoint for AuthMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, mut req: poem::Request) -> Result<Self::Output, poem::Error> {
        // Extract the authorization header
        let auth_header = req
            .headers()
            .get("Authorization")
            .ok_or_else(|| poem::Error::from_status(StatusCode::UNAUTHORIZED))?;

        let token_str = auth_header
            .to_str()
            .map_err(|_| poem::Error::from_status(StatusCode::UNAUTHORIZED))?;

        let token = token_str.trim_start_matches("Bearer ").trim();

        info!("Processing token: {}", token);

        let validation = Validation::new(Algorithm::HS256); 
        let decoding_key = DecodingKey::from_secret(self.jwt_secret.as_bytes());

        let decoded = decode::<Claims>(token, &decoding_key, &validation)
            .map_err(|e| {
                info!("Token decode error: {:?}", e);
                poem::Error::from_string("Invalid token", StatusCode::UNAUTHORIZED)
            })?;

        info!("Decoded token: {:?}", decoded);

        // saving request in req.extension
        let _user_id = decoded.claims.sub;
        req.extensions_mut().insert(UserId(_user_id));
        

        self.ep.call(req).await
    }
}