//@ts-check

import React from "react";
import SignInModal from "./SignInModal";

export default () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <a style={{ cursor: "pointer" }} className="nav-link" onClick={() => setModalShow(true)}>
        Iniciar sesión
      </a>

      <SignInModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}