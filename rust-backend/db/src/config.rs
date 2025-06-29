use sqlx::postgres::{PgPool, PgPoolOptions};
use std::env;
use log::info;

pub struct Config {
    pub db_url: String
}

impl Default for Config {
    fn default() -> Self {
        let db_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");
        info!("DATABASE_URL: {}", db_url); 
        Self {
            db_url: db_url
        }
    }
}

pub async fn create_pool() -> PgPool {
    let config = Config::default();
    info!("Creating database pool with connection timeout of 10 seconds");
    
    PgPoolOptions::new()
        .max_connections(3)
        .acquire_timeout(std::time::Duration::from_secs(10))
        .connect(&config.db_url)
        .await
        .expect("Failed to create pool")
}