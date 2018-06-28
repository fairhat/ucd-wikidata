import React from "react";
import { Divider } from "antd";

const LeftNavbar = () =>
  <div className="leftnav">
    <p style={{ margin: "0" }}>
      <a href="#">Hauptseite</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Themenportale</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Von A bis Z</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Zufälliger Artikel</a>
    </p>

    <p style={{ margin: "0", marginTop: "15px" }}>Mitmachen</p>
    <Divider style={{ margin: "0", marginBottom: "5px" }} />
    <p style={{ margin: "0" }}>
      <a href="#">Artikel verbessern</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Neuen Artikel anlegen</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Autorenportal</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Hilfe</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Letzte Änderungen</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Kontakt</a>
    </p>
    <p style={{ margin: "0" }}>
      <a href="#">Spenden</a>
    </p>
  </div>;

export default LeftNavbar;
