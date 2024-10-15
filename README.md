Các sử dụng git:
Tạo một thư mục ở đâu đó trong máy. Bấm chuột phải vào thư mục đó chọn Open gitbash here
Clone project về: git clone https://github.com/cuongduong18o2/DAPM.git
Tạo nhánh mới (đừng sử dụng nhánh main): git branch (tên nhánh)
Chuyển sang nhánh đó để làm việc: git checkout (tên nhánh)
Sau đó làm việc trên nhánh đó rồi commit code lên (sử dụng từng lệnh đừng copy toàn bộ): git add . / git commit -m "tin nhắn (ví dụ: sửa bug, thêm tính năng ,...)" / git push
Rồi tạo pull request ở đây để tui kiểm tra code rồi add vào nhánh chính. Nếu được thì thêm cho tui 1 vài description để tui check cho dễ cũng được. Xong bấm nút xác nhận rồi chờ tui reply thôi


Một vài lưu ý


Ngay trước khi mở Visual Studio Code lên thì nhớ sử dụng git pull origin main để lấy code mới nhất được tui update trên nhánh main về làm để tránh bị lỗi HOẶC sử dụng git checkout main rồi git pull khi nào nó hiện ra giống như thế này là được.
Sau khi đã pull xong thì chuyển nhánh sang nhánh của mấy ông git checkout ... rồi sử dụng git merge main để lấy đống code pull được từ trên nhánh main vào trong nhánh của ông
Kiểm tra trạng thái nhánh trước khi làm việc: git status
Nhớ chuyển sang nhánh mấy ông đã tạo để làm Đừng làm trên nhánh main
Lúc sử dụng git commit -m "tin nhắn" thì ở chỗ tin nhắn mấy ông liệt kê càng chi tiết càng tốt nha
