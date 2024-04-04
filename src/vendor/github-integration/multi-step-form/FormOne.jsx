import {useState} from 'react'

function FormOne(props) {
	return (
		<div className="version-form-group-wrapper">
			<div className="version-form-group">
				<label htmlFor="access-token">Access Token</label>
				<input className="version-control-input" onChange={e => props.setToken(e.target.value)} type="text" id="access-token" name="access-token" placeholder="Enter Access Token..." />
			</div>
		</div>
	)
}

export default FormOne