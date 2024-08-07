export const initialsName = (name: string) => {
  const names = (name + " ").split(" ");
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase().trim();
};
export const capitalize = (s: any) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const capitalizeWords = (s: any) => {
  if (typeof s !== "string") return "";
  const words = (s.toLowerCase() + " ").split(" ");
  let result = "";
  words.map((word) => {
    result += capitalize(word) + " ";
  });
  return result.trim();
};
export const getUrlImages = (url: string) => {
  const originalString = process.env.NEXT_PUBLIC_API_URL as string;
  const lastIndexOfString = originalString.lastIndexOf("/api");
  if (lastIndexOfString === -1) {
    return originalString + url;
  }
  const replacementString = "/storage";
  const newUrl =
    originalString.substring(0, lastIndexOfString) + replacementString + url;
  return newUrl;
};

export const getFullName = (data: any): string => {
  if (!data) {
    return "";
  }
  const { name, middle_name, last_name, mother_last_name } = data;
  let fullName = "";
  if (name) {
    fullName += name + " ";
  }
  if (middle_name) {
    fullName += middle_name + " ";
  }
  if (last_name) {
    fullName += last_name + " ";
  }
  if (mother_last_name) {
    fullName += mother_last_name + " ";
  }
  return fullName.trim();
};
export const displayObjectAsHtml = (obj: Record<string, any>): JSX.Element => {
  return (
    <ul
      className="text-[8px] font-mono font-light"
      style={{ lineHeight: "8px" }}
    >
      {Object.entries(obj).map(([key, value]) => (
        <li key={key}>
          <span className="font-extrabold">{key}: </span>
          {value}
        </li>
      ))}
    </ul>
  );
};
// document.addEventListener("keydown", function (e) {
//   e.preventDefault();
//   if (e.ctrlKey && e.key === "p") {
//     takeScreenshot(function (screenshot) {

//       printPage(screenshot);
//     });
//   }
// });
// export function printPage(screenshot) {
//   var win: any = window.open("", "prueba");
//   win.document.write("<html>");
//   win.document.write("<head></head>");
//   win.document.write("<body>");
//   win.document.write('<img src="' + screenshot + '"/>');
//   win.document.write("</body>");
//   win.document.write("</html>");
//   win.print();
//   win.close();
// }
export function takeScreenshot(cb: any) {
  // html2canvas(document.getElementById('area'), {
  //   useCORS: true,
  //   onrendered: function (canvas) {
  //     var image = canvas.toDataURL();
  //     cb(image);
  //   }
  // });
}
