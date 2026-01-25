import React, { Component } from 'react';
import SmallArrow from './small_arrow';
import onClickOutside from 'react-onclickoutside';

class Slider extends Component {
	render() {
		return (
			<input
				type="range"
				onChange={this.props.onChange}
				className={this.props.className}
				name={this.props.name}
				min="0"
				max="100"
				value={this.props.value}
				step="1"
			/>
		);
	}
}

export class StatusCard extends Component {
	constructor() {
		super();
		this.wrapperRef = React.createRef();
		this.state = {
			sound_level: 75,
			brightness_level: 100
		};
	}
	
	handleClickOutside = () => {
		this.props.toggleVisible();
	};
	
	componentDidMount() {
		this.setState({
			sound_level: localStorage.getItem('sound-level') || 75,
			brightness_level: localStorage.getItem('brightness-level') || 100
		}, () => {
			document.getElementById('monitor-screen').style.filter = `brightness(${3 / 400 * this.state.brightness_level + 0.25})`;
		})
	}

	handleBrightness = (e) => {
		this.setState({ brightness_level: e.target.value });
		localStorage.setItem('brightness-level', e.target.value);
		document.getElementById('monitor-screen').style.filter = `brightness(${3 / 400 * e.target.value + 0.25})`;
	};

	handleSound = (e) => {
		this.setState({ sound_level: e.target.value });
		localStorage.setItem('sound-level', e.target.value);
	};

	render() {
		return (
			<div
				ref={this.wrapperRef}
				className={`
					absolute rounded-xl py-3 top-10 right-2 
					shadow-2xl border border-white/10
					bg-ub-cool-grey/95 backdrop-blur-xl
					${this.props.visible ? 'visible animateShow' : 'invisible'}
				`}
			>
				{/* Arrow */}
				<div className="absolute w-0 h-0 -top-1.5 right-6 top-arrow-up" />
				
				{/* Sliders Section */}
				<div className="px-4 pb-3 border-b border-white/10">
					{/* Volume */}
					<div className="py-2 flex items-center gap-3 group">
						<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
							<img width="16" height="16" src="./themes/Yaru/status/audio-headphones-symbolic.svg" alt="Volume" />
						</div>
						<Slider
							onChange={this.handleSound}
							className="ubuntu-slider flex-1"
							value={this.state.sound_level}
							name="headphone_range"
						/>
						<span className="text-xs text-gray-400 w-8 text-right">{this.state.sound_level}%</span>
					</div>
					
					{/* Brightness */}
					<div className="py-2 flex items-center gap-3 group">
						<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
							<img width="16" height="16" src="./themes/Yaru/status/display-brightness-symbolic.svg" alt="Brightness" />
						</div>
						<Slider
							onChange={this.handleBrightness}
							className="ubuntu-slider flex-1"
							name="brightness_range"
							value={this.state.brightness_level}
						/>
						<span className="text-xs text-gray-400 w-8 text-right">{this.state.brightness_level}%</span>
					</div>
				</div>
				
				{/* Status Items */}
				<div className="py-2 border-b border-white/10">
					<StatusItem 
						icon="./themes/Yaru/status/network-wireless-signal-good-symbolic.svg" 
						label="Wi-Fi" 
						value="Connected" 
						hasArrow 
					/>
					<StatusItem 
						icon="./themes/Yaru/status/bluetooth-symbolic.svg" 
						label="Bluetooth" 
						value="Off" 
						hasArrow 
					/>
					<StatusItem 
						icon="./themes/Yaru/status/battery-good-symbolic.svg" 
						label="Battery" 
						value="75%" 
						hasArrow 
					/>
				</div>
				
				{/* Actions */}
				<div className="pt-2">
					<ActionItem 
						icon="./themes/Yaru/status/emblem-system-symbolic.svg" 
						label="Settings" 
					/>
					<ActionItem 
						icon="./themes/Yaru/status/changes-prevent-symbolic.svg" 
						label="Lock Screen" 
						onClick={this.props.lockScreen}
					/>
					<ActionItem 
						icon="./themes/Yaru/status/system-shutdown-symbolic.svg" 
						label="Power Off" 
						onClick={this.props.shutDown}
						hasArrow
					/>
				</div>
			</div>
		);
	}
}

function StatusItem({ icon, label, value, hasArrow }) {
	return (
		<div className="w-64 px-4 py-2 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors">
			<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
				<img width="16" height="16" src={icon} alt={label} />
			</div>
			<div className="flex-1 flex items-center justify-between">
				<span className="text-sm text-white">{label}</span>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-400">{value}</span>
					{hasArrow && <SmallArrow angle="right" />}
				</div>
			</div>
		</div>
	);
}

function ActionItem({ icon, label, onClick, hasArrow }) {
	return (
		<div 
			onClick={onClick}
			className="w-64 px-4 py-2 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors group"
		>
			<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ub-orange/20 transition-colors">
				<img width="16" height="16" src={icon} alt={label} />
			</div>
			<div className="flex-1 flex items-center justify-between">
				<span className="text-sm text-white group-hover:text-ub-orange transition-colors">{label}</span>
				{hasArrow && <SmallArrow angle="right" />}
			</div>
		</div>
	);
}

export default onClickOutside(StatusCard);
