Chào bạn! Đây là một trong những dự án tôi làm trong lớp Đồ họa máy tính tại NJCU. Chúng tôi được phép dùng bất kỳ công nghệ nào, miễn là dự án vận dụng các khái niệm của Đồ họa máy tính.

## React và Three.js

Tôi chọn dùng React và Three.js vì các khái niệm nền tảng đã được Three.js hiện thực sẵn, còn khi dùng thêm React, code được đơn giản hóa thành thứ rất dễ hiểu. Ví dụ, đây là phiên bản code cuối cùng của Hệ Mặt Trời.

```jsx
function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  return (
    <div id={'app'}>
      <Canvas camera={{ position: [-1500, 550, 120], fov: 60, far: 100000 }}>
        <Stars />
        <Sun />
        <Planets
          planetData={planetData}
          zoomToView={(focusRef) => {
            setZoom(!zoom);
            setFocus(focusRef);
          }}
        />
        <Lights />
        <FPSControls />
        {/* <Controls zoom={zoom} focus={focus} /> */}
      </Canvas>
    </div>
  );
}
```

Code rất đơn giản và dễ hiểu, nhưng phần code bên dưới sử dụng nhiều khái niệm toán học, chẳng hạn như chuyển động của các ngôi sao trong không gian và mặt phẳng quỹ đạo của từng hành tinh. Chúng tôi cũng học các khái niệm như áp texture, phép quay, phép co giãn, bóng đổ và chuyển động camera.

Dự án này rất nhỏ, nhưng qua việc tạo Hệ Mặt Trời này bằng React và Three.js, tôi đã nắm được khá nhiều kiến thức nền tảng về Đồ họa máy tính.

Dưới đây là đoạn ghi hình di chuyển trong không gian của Hệ Mặt Trời.

![Bản demo Hệ Mặt Trời](/work/solar-system.mp4)

Cảm ơn bạn đã đọc, và mời bạn xem thêm về [các dự án khác của tôi!](/projects/)

## Liên kết và tài liệu tham khảo

- [Trang web Hệ Mặt Trời](https://eduardovidals.github.io/SolarSystem)
