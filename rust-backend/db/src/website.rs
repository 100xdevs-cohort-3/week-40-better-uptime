use chrono::{NaiveDateTime, Utc};
use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::{Error, FromRow};
use uuid::Uuid;

#[derive(FromRow, Serialize, Deserialize)]
pub struct Website {
    pub id: Uuid,
    pub url: String,
    pub time_added: NaiveDateTime,
    pub user_id: Uuid, 
}

impl Db {
    pub async fn create_website(&self, url: String, user_id: Uuid) -> Result<Website, Error> {
        info!("Creating a new site with url: {}", url);
        info!("Creating a new site with userId: {}", user_id);
        
        let now = Utc::now().naive_utc();
        info!("Creating a new site with time_added: {}", now);

        let website = sqlx::query_as::<_, Website>(
            r#"
            INSERT INTO website (id, url, time_added, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            "#,
        )
        .bind(Uuid::new_v4())
        .bind(url)
        .bind(now)
        .bind(user_id)
        .fetch_one(&self.client)
        .await?;
        
        info!("Website created successfully with id: {}", website.id);
        Ok(website)
    }
}