function submitWork() {
    // ดึงค่าจากช่อง Input (ต้องมั่นใจว่าใน HTML ตั้ง id ไว้ตามนี้)
    const stdID = document.getElementById("stdID").value;
    const stdName = document.getElementById("stdName").value;
    const classLevel = document.getElementById("classLevel").value;
    const studentNo = document.getElementById("studentNo").value;
    const fileInput = document.getElementById("fileInput"); // ID ของช่องแนบไฟล์
    
    // ตรวจสอบว่ากรอกครบไหม
    if (!stdID || !stdName || !fileInput.files[0]) {
        alert("กรุณากรอกข้อมูลให้ครบและแนบไฟล์รูปภาพ");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const base64Image = reader.result;

        // สร้าง Object ข้อมูล
        const newSubmission = {
            stdID: stdID,
            studentName: stdName,
            classLevel: classLevel,
            studentNo: studentNo,
            fileData: base64Image,
            status: "ส่งงานแล้ว", // สถานะเริ่มต้น
            timestamp: new Date().toLocaleString()
        };

        // บันทึกลง LocalStorage (ชื่อคีย์ต้องตรงกับหน้าอื่น)
        let submissions = JSON.parse(localStorage.getItem("submittedWorks")) || [];
        submissions.push(newSubmission);
        localStorage.setItem("submittedWorks", JSON.stringify(submissions));

        // สำคัญ: ต้องเซฟรหัสตัวเองไว้เพื่อให้หน้า History กรองเจอ
        localStorage.setItem("studentID", stdID);
        localStorage.setItem("studentName", stdName);

        alert("ส่งงานสำเร็จ!");
        window.location.href = "history.html"; // ไปหน้าประวัติทันที
    };

    reader.readAsDataURL(file);
}