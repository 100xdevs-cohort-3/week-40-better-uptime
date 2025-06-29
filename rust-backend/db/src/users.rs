use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub password: String,
    pub verified: bool,
}

impl Db {
    pub async fn create_user(&self, email: String, name: String, password:String) -> Result<User, Error> {
        info!("Creating new user with email: {}", email);
        info!("Creating new user with name: {}", name);
        info!("Creating new user with password: {}", password);

        let user = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (id, email, name, password, verified)
            VALUES ($1, $2, $3, $4, false)
            ON CONFLICT (email) DO UPDATE
            SET email = EXCLUDED.email
            RETURNING *
            "#,
        )
        .bind(Uuid::new_v4())
        .bind(email)
        .bind(name)
        .bind(password)
        .fetch_one(&self.client)
        .await?;

        info!("User created/updated successfully with id: {}", user.id);
        Ok(user)
    }

    pub async fn login_user(&self, email: String, password: String) -> Result<User, Error> {
        info!("Verifying signin for user with email: {}", email);
        info!("Verifying signin for user with name: {}", password);

        let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE email = $1")
            .bind(email)
            .fetch_one(&self.client)
            .await?;

        info!("Signin verified for user with id: {}", user.id);
        Ok(user)
    }
}
