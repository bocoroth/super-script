#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_fonts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_system_fonts() -> String {
    let mut db = fontdb::Database::new();
    db.load_system_fonts();

    let faces = db.faces().clone();

    return format!("{:?}", faces);
}
