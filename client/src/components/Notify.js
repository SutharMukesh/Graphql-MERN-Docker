import React, { useState } from "react";
import { Toast } from "react-bootstrap";

function Notify(props) {
	return (
		<div
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: "relative",
				minHeight: "100px",
			}}
		>
			<Toast
				style={{
					position: "absolute",
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
					<strong className="mr-auto">Bootstrap</strong>
					<small>just now</small>
				</Toast.Header>
				<Toast.Body>See? Just like this.</Toast.Body>
			</Toast>
		</div>
		// <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
		//     <div class="toast" style="position: absolute; top: 0; right: 0;">
		//         <div class="toast-header">
		//             <img src="..." class="rounded mr-2" alt="..."/>
		//             <strong class="mr-auto">{props.title}</strong>
		//             <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
		//                 <span aria-hidden="true">&times;</span>
		//             </button>
		//         </div>
		//         <div class="toast-body">
		//         {props.message}
		//         </div>
		//     </div>
		// </div>
	);
}

const style = {};
Notify.style = style;
export default Notify;
