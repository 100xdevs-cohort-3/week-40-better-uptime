use db::Db;
use poem::{listener::TcpListener, middleware::Cors, EndpointExt, Route, Server};
use poem_openapi::OpenApiService;
use std::{env, sync::Arc};

use dotenv::dotenv;
mod error;
mod routes;
#[derive(Clone)]
pub struct AppState {
    db: Arc<Db>,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());

    let db = Db::new().await;
    db.init().await.expect("Failed to initialize database");

    
    let db = Arc::new(db);
    let server_url = format!("http://localhost:{}/api/v1", port);

    // API services
    let user_api_service = OpenApiService::new(routes::users::UserApi, "User API", "1.0")
        .server(format!("{}/user", server_url));
    let website_api_service = OpenApiService::new(routes::websites::WebsiteApi, "Website API", "1.0")
    .server(format!("{}/website", server_url));

    let user_ui = user_api_service.swagger_ui();
    let website_ui = website_api_service.swagger_ui();
    // routes
    let app = Route::new()
        .nest("/api/v1/user", user_api_service)
        .nest("/docs/user", user_ui)
        .nest("/api/v1/website", website_api_service)
        .nest("/docs/website", website_ui);

    let app = app.with(Cors::new()).data(AppState { db });
    let _ = Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await;
}
