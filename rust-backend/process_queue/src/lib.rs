use std::collections::HashMap;
use log::info;
use serde::{Serialize, Deserialize};
use redis::{Client, Commands};
use reqwest;

pub struct StreamQueue {
    queue: redis::Connection,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum QueueDataProcessingStatus {
    Pending,
    Success,
    Failed,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QueueData {
    pub site: String,
    pub site_id: String,
    pub user_id: String,
    pub status: QueueDataProcessingStatus,
}

impl QueueData {
    pub fn new(site: String, site_id: String, user_id: String, status: QueueDataProcessingStatus) -> Self {
        Self {
            site,
            site_id,
            user_id,
            status,
        }
    }
}

impl StreamQueue {
    pub fn new() -> Self {
        let redis_client = Client::open("redis://127.0.0.1:6379").unwrap();
        let redis_conn = redis_client.get_connection().unwrap();

        info!("Redis Connected");

        Self { queue: redis_conn }
    }

    pub fn print_queue(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        info!("Printing queue contents:");

        let items: Vec<String> = self.queue.lrange("stream_queue", 0, -1)?;

        for item in items {
            let parsed: HashMap<String, QueueData> = serde_json::from_str(&item)?;
            println!("Item: {:?}", parsed);
        }

        info!("Queue printed.");
        Ok(())
    }

    pub fn push_site(&mut self, item: HashMap<String, QueueData>) {
        match serde_json::to_string(&item) {
            Ok(serialized_data) => {
                let _: () = self.queue.rpush("stream_queue", serialized_data).unwrap();
                info!("Pushed {} items to queue", item.len());
            }
            Err(e) => {
                log::error!("Failed to serialize HashMap: {}", e);
            }
        }

        info!("Received hash_map with {} entries", item.len());
    }

    pub async fn process_sites(&mut self) -> Result<String, Box<dyn std::error::Error>> {
        let item: Option<String> = self.queue.lpop("stream_queue", None)?;


        if let Some(json_str) = item {
            let entry: HashMap<String, QueueData> = serde_json::from_str(&json_str)?;
            if let Some(queue_data) = entry.values().next() {
                let site = &queue_data.site;
                info!("Processing site: {}", site);
                info!("site id {}", queue_data.site_id);
                info!("user id {}", queue_data.user_id);

                let response = reqwest::get(site).await?;
                let status = response.status();
                let body = response.text().await?;
                match status.as_u16() {
                    200 => return Ok("UP".to_string()),
                    _ => return Ok("DOWN".to_string()),
                }

            } else {
                return Ok("No data inside the entry.".to_string());
            }
        } else {
            return Ok("Queue is empty.".to_string());
        }
    }
}

/* 

Approach:

HashMap: <"timestamp1", {site, site_id, user_id, status}>, <"timestamp2", {site, site_id, user_id, status}>
Queue: [ <"timestamp3", {site, site_id, user_id, status}>, <"timestamp4", {site, site_id, user_id, status}>, <"timestamp5", {site, site_id, user_id, status}> ]

Push -> I am pushing the site, status with key ( "timestamp" ) after serializing the item.
Processing -> Get the item, deserialze it and make the request.

*/ 