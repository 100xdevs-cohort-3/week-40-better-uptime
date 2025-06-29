use db::Db;
use process_queue::{StreamQueue};
use worker::start_worker;
use poem::{listener::TcpListener, middleware::Cors, EndpointExt, Route, Server};
use poem_openapi::OpenApiService;
use std::{env, sync::{Arc, Mutex}};

use dotenv::dotenv;
mod error;
mod routes;
mod middleware;
#[derive(Clone)]
pub struct AppState {
    db: Arc<Db>,
    queue: Arc<Mutex<StreamQueue>>,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let jwt_secret =  env::var("SECRET").unwrap_or_else(|_| "admin".to_string());
    let db = Db::new().await;
    let queue = StreamQueue::new();
    db.init().await.expect("Failed to initialize database");

    let queue = Arc::new(Mutex::new(queue));
    
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
        .nest("/api/v1/website", website_api_service.with(middleware::user::AuthMiddleware::new(jwt_secret)))
        .nest("/docs/website", website_ui);

    let app = app.with(Cors::new()).data(AppState { db, queue });
    let _ = Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await;
}
