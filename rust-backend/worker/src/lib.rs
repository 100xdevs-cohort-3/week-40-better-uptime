use process_queue::StreamQueue;
use log::{info, error};
use std::{sync::{Arc, Mutex}, time::Duration};

pub async fn start_worker(queue: Arc<Mutex<StreamQueue>>) {
    info!("Starting continuous worker process...");

    loop {
        let result = {
            let mut q = queue.lock().expect("Failed to lock queue");
            q.process_sites().await
        };

        match result {
            Ok(msg) => {
                if msg == "Queue is empty." {
                    info!("Queue is empty, waiting for new items...");
                    tokio::time::sleep(Duration::from_secs(5)).await;
                } else {
                    info!("Successfully processed: {}", msg);
                }
            }
            Err(e) => {
                error!("Error processing queue item: {}", e);
                tokio::time::sleep(Duration::from_secs(10)).await;
            }
        }
    }
}
