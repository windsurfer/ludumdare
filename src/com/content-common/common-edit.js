import { h, Component } 				from 'preact/preact';

import SVGIcon 							from 'com/svg-icon/icon';
import ButtonBase 						from 'com/button-base/base';

export default class ContentCommonEdit extends Component {
	constructor( props ) {
		super(props);
	}

//	shouldComponentUpdate( nextProps ) {
//		return this.props.edit !== nextProps.edit ||
//			this.props.modified !== nextProps.modified ||
//			this.props.published !== nextProps.published;
//	}

	render( props /*{edit, modified, published, onedit, onpreview, onsave, onpublish, onpublish2}, state*/ ) {
		var ShowEdit = null;
		var ShowPreview = null;
		var ShowSave = null;
		var ShowPublish = null;
		
		if ( props.editing ) {
			ShowEdit = <ButtonBase class="-selected"><SVGIcon>edit</SVGIcon><span>Edit</span></ButtonBase>;
			ShowPreview = <ButtonBase onclick={props.onpreview}><SVGIcon>preview</SVGIcon><span>Preview</span></ButtonBase>;
		}
		else {
			ShowEdit = <ButtonBase onclick={props.onedit}><SVGIcon>edit</SVGIcon><span>Edit</span></ButtonBase>;
			ShowPreview = <ButtonBase class="-selected"><SVGIcon>preview</SVGIcon><span>Preview</span></ButtonBase>;
		}

		if ( props.modified ) {
			ShowSave = <ButtonBase class="-available -save" onclick={props.onsave}><SVGIcon>save</SVGIcon><span>Save</span></ButtonBase>;
		}
		else {
			ShowSave = <ButtonBase><SVGIcon>save</SVGIcon><span>Saved</span></ButtonBase>;
		}

//		if ( !props.hide_published ) {
			if ( props.published ) {
				ShowPublish = <ButtonBase><SVGIcon>publish</SVGIcon><span>Published</span></ButtonBase>;
			}
			else if ( props.published === false ) {
				ShowPublish = [
					<ButtonBase class="-available -publish" onclick={props.onpublish}><SVGIcon>publish</SVGIcon><span>Publish</span></ButtonBase>,
//					<ButtonBase class="-available -publish" onclick={onpublish}><SVGIcon>publish</SVGIcon><span>Publish Compo</span></ButtonBase>,
//					<ButtonBase class="-available -publish" onclick={onpublish2}><SVGIcon>publish</SVGIcon><span>Publish Jam</span></ButtonBase>
				];
			}
			// Otherwise, published is null, so publish button is not shown
//		}
	
		return (
			<div class="content-common-body -edit">
				<div class="-right">
					{ShowSave}
					{ShowPublish}
				</div>
				<div class="-left">
					{ShowEdit}
					{ShowPreview}
				</div>
			</div>
		);
	}
}
