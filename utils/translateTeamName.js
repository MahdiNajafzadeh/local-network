module.exports = (userTeamName) => {
  switch (userTeamName) {
    case "Network":
      teamNameFarsi = "شبکه";
      break;
    case "User-Interface":
      teamNameFarsi = "رابط کاربری";
      break;
    case "Financial":
      teamNameFarsi = "مالی";
      break;
    case "Monitoring":
      teamNameFarsi = "مانیتورینگ";
      break;
    case "Hardware":
      teamNameFarsi = "سخت افزار";
      break;
    case "Graphic":
      teamNameFarsi = "گرافیک";
      break;
    case "Farashenasa":
      teamNameFarsi = "فراشناسا";
      break;
    case "Devops":
      teamNameFarsi = "Devops";
      break;
    case "Digital-Marketing":
      teamNameFarsi = "دیجیتال مارکتینگ";
      break;
    case "Office":
      teamNameFarsi = "اداری";
      break;
    case "Artificial-Intelligence":
      teamNameFarsi = "هوش مصنوعی";
      break;
    case "Business-Development":
      teamNameFarsi = "توسعه تجاری";
      break;
    case "Translation":
      teamNameFarsi = "ترجمه";
      break;
    case "Android":
      teamNameFarsi = "اندروید";
      break;
    case "Client":
      teamNameFarsi = "کلاینت";
      break;
    case "DotNet":
      teamNameFarsi = "دات نت";
      break;
    case "Infrastructure":
      teamNameFarsi = "زیرساخت";
      break;
    case "Project-Control":
      teamNameFarsi = "مدیریت پروژه";
      break;
    case "Data-Gathering":
      teamNameFarsi = "داده‌گیری";
      break;
    case "DataBase":
      teamNameFarsi = "پایگاه داده";
      break;
    case "Wordpress":
      teamNameFarsi = "وردپرس";
      break;
    case "Security":
      teamNameFarsi = "امنیت";
      break;
    default:
      teamNameFarsi = null;
      break;
  }
  return teamNameFarsi;
};
