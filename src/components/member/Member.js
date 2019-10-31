import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Member extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			position: props.position,
			location: props.location,
			id: props.id
		}
	};

	onClickMember = () => {
		const dataToSend = {
			name: this.state.name,
			position: this.state.position,
			location: this.state.location,
			id: this.state.id
		}

		this.props.showMember(dataToSend);
	};

	render() {
		const { name, position, location, avatar } = this.props;

		return (
			<div 
				className="Member"
				onClick={this.onClickMember}
			>
				<div className="Member__icon">
					<FontAwesomeIcon icon={faEnvelope} />
				</div>
				<div
					className="Member__image Member__image-wrapper"
				>
					<img
						className="rounded"
						src={`/avatars/${avatar}`}
						alt={name}
					/>
				</div>
				<div className="Member__description-wrapper">
					<h5>{name}</h5>
					<p className="Member__position">{position}</p>
					<span>{location}</span>
				</div>
			</div>
		);
	}
};

export default Member;