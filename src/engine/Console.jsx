import { useState } from "react";

export default function Console(props) {


    return (
        <div id="console" style={{height: '24px'}}>{props.message}</div>
    )

}