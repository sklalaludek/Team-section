import React, { Component, Fragment } from "react";
import { members } from "../../assets/data/mockupData"
import Member from "../member/Member";
import { Container, Row, Col } from 'reactstrap';
import {
	Modal,
	ModalHeader,
	ModalBody
} from "reactstrap";
import {
	Carousel,
	CarouselItem,
	CarouselControl
} from "reactstrap";

class SectionTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
			showModal: false,
			animating: false,
			setAnimating: false,
			activeMember: {
				name: "",
				position: "",
				location: "",
				id: null
			},
			isMobileView: window.innerWidth >= 960
		}
	};

	onClickDivMember = ({ name, position, location, id }) => {
		this.setState({
			showModal: true,
			activeMember: {
				name,
				position,
				location,
				id
			},
			activeIndex: id
		});
	};

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	};

	members = members.map((member, index) => {
		const memberItem = (
			<Member
				key={member.id}
				name={member.name}
				position={member.position}
				location={member.location}
				avatar={member.avatar}
				id={member.id}
				showMember={this.onClickDivMember}
			/>
		);

		return index === 0 || index === 5 ?
			(
				<Col
					key={index}
					xs="12" sm="4" lg={{ size: 2, offset: 1 }}
				>
					{memberItem}
				</Col>
			)
			: (
				<Col
					key={index}
					xs="12" sm="4" lg="2"
				>
					{memberItem}
				</Col>
			);
	});

	next = () => {
		if (this.state.animating) {
			return;
		}

		if (this.state.activeIndex !== members.length - 1) {
			this.setState({
				activeIndex: this.state.activeIndex + 1
			});
		}
	};

	previous = () => {
		if (this.state.animating) {
			return;
		}

		if (this.state.activeIndex !== 0) {
			this.setState({
				activeIndex: this.state.activeIndex - 1
			})
		}
	};

	slides = members.map((member) => {
		return (
			<CarouselItem
				className="member-slide"
				tag="div"
				key={member.id}
				onExiting={() => this.setState({ setAnimating: true })}
				onExited={() => this.setState({ setAnimating: false })}
			>
				<div>
					<h4>{member.position}</h4>
					<h3>{member.name}</h3>
				</div>
			</CarouselItem>
		);
	});

	render() {
		return (
			<Fragment>
				<section className="Section-team">
					<Container>
						<Row>
							<Col>
								<h2 className="Section-team__title">Meet Our Team</h2>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="Section-team__content">
									<Row>
										{this.members}
									</Row>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				{
					this.state.isMobileView && (
						<Modal
							isOpen={this.state.showModal}
							toggle={this.toggleModal}
							className="Section-team__modal"
						>
							<ModalHeader toggle={this.toggleModal}></ModalHeader>
							<ModalBody>
								<div>
									<Carousel
										activeIndex={this.state.activeIndex}
										next={this.next}
										previous={this.previous}
										interval={false}
									>
										{this.slides}
										<CarouselControl
											direction="prev"
											directionText="Previous"
											onClickHandler={this.previous}
										/>
										<CarouselControl
											direction="next"
											directionText="Next"
											onClickHandler={this.next}
										/>
									</Carousel>
								</div>
							</ModalBody>
						</Modal>
					)
				}
			</Fragment>
		);
	}
};

export default SectionTeam;