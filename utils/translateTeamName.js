module.exports = (userTeamName) => {
  switch (userTeamName) {
    case "Network":
      return "شبکه";
    case "User-Interface":
      return "رابط کاربری";
    case "Financial":
      return "مالی";
    case "Monitoring":
      return "مانیتورینگ";
    case "Hardware":
      return "سخت افزار";
    case "Graphic":
      return "گرافیک";
    case "Farashenasa":
      return "فراشناسا";
    case "Devops":
      return "Devops";
    case "Digital-Marketing":
      return "دیجیتال مارکتینگ";
    case "Office":
      return "اداری";
    case "Artificial-Intelligence":
      return "هوش مصنوعی";
    case "Business-Development":
      return "توسعه تجاری";
    case "Translation":
      return "ترجمه";
    case "Android":
      return "اندروید";
    case "Client":
      return "کلاینت";
    case "DotNet":
      return "دات نت";
    case "Infrastructure":
      return "زیرساخت";
    case "Project-Control":
      return "مدیریت پروژه";
    case "Data-Gathering":
      return "داده‌گیری";
    case "DataBase":
      return "پایگاه داده";
    case "Wordpress":
      return "وردپرس";
    case "Security":
      return "امنیت";
    default:
      return "بدون گروه";
  }
};
