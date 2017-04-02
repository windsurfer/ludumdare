import { h, Component } 				from 'preact/preact';

import NavSpinner						from 'com/nav-spinner/spinner';
import NavLink 							from 'com/nav-link/link';
import SVGIcon 							from 'com/svg-icon/icon';

import ContentLoading					from 'com/content-loading/loading';

//import ContentCommonBody				from 'common-body';
//import ContentCommonBodyTitle			from 'common-body-title';
//import ContentCommonBodyAvatar			from 'common-body-avatar';
//import ContentCommonBodyMarkup			from 'common-body-markup';

//import ContentFooterButtonMinMax		from 'com/content-footer/footer-button-minmax';
import ContentFooterButtonStar			from 'com/content-footer/footer-button-star';
import ContentFooterButtonLove			from 'com/content-footer/footer-button-love';
import ContentFooterButtonComments		from 'com/content-footer/footer-button-comments';

import $Node							from '../../shrub/js/node/node';

export default class ContentCommon extends Component {
	constructor( props ) {
		super(props);

		this.state = {
//			'author': {},
			'minimized': false
		};

//		if ( props.authored )
//			this.getAuthor( props.node );

		this.onMinMax = this.onMinMax.bind(this);
	}

//	shouldComponentUpdate( nextProps, nextState ) {
//		var com = ShallowCompare(this, nextProps, nextState);
////		console.log("HOOP",com,this.props, nextProps);
////		console.log("HOOP",com,this.state, nextState);
//		return com;
//	}

//	componentWillReceiveProps( props ) {
//	componentWillUpdate( newProps, newState ) {
//		if ( this.props.node !== newProps.node ) {
//			this.getAuthor(newProps.node);
//		}
//	}

//	getAuthor( node ) {
//		// Clear the Author (QUESTION: why?)
//		this.setState({ author: {} });
//
//		// Lookup the author
//		$Node.Get( node.author )
//		.then(r => {
//			if ( r.node && r.node.length ) {
//				this.setState({ 'author': r.node[0] });
//			}
//			else {
//				this.setState({ 'error': "Not found" });
//			}
//		})
//		.catch(err => {
//			this.setState({ 'error': err });
//		});
//	}

//	getAvatar( user ) {
//		return STATIC_ENDPOINT + ((user && user.meta && user.meta.avatar) ? user.meta.avatar : '/other/dummy/user64.png');
//	}

	getAtName( user ) {
		var user_path = '/users/'+user.slug;
		return <NavLink class="at-name" href={user_path}><img src={this.getAvatar(user)} />{user.name}</NavLink>;
	}

	onMinMax( e ) {
		this.setState({
			'minimized': !this.state.minimized 
		});
	}

	render( props, {author, minimized, error} ) {
		var node = props.node;
		var user = props.user;
		var path = props.path;
		var extra = props.extra;
		
		// If a Minimized property was included, invert the internal state
		if ( props.minimized ) {
			minimized = !minimized;
		}
		
		// Parse extra modes
		if ( extra ) {
			// If extra is 'edit', we're in edit mode
			var EditMode = extra.length ? extra[0] === 'edit' : false;
		}		
		
		if ( node && node.slug ) { //((node.slug && !props.authored) || (node.slug && author.slug)) ) {
			let MainClass = [
				'content-base',
				'content-common'
			];
			
			// TODO: Append classes

			if ( minimized )
				MainClass.push('minimized');


			let HasHeader = null;
			if ( props.header ) {
				HasHeader = <div class={['content-common-header', props.headerClass ? props.headerClass : '']}>{props.header}</div>;
			}
			
//			var dangerousParsedTitle = { __html:titleParser.parse(node.name) };
//
//			var date_pub = new Date(node.published);
//			var date_now = new Date();
//			var pub_diff = (date_now.getTime() - date_pub.getTime());// - (date_now.getTimezoneOffset()*60);
//
//			// x minutes ago
//			var post_relative = <span class="if-sidebar-inline" title={date_pub + " (" + node.published + ") ** " + date_now + " ** " + pub_diff}>{getRoughAge(pub_diff)}</span>;
//			// simple date, full date on hover
//			var post_date = <span>on <span class="-title" title={getLocaleDate(date_pub)}><span class="if-sidebar-inline">{getLocaleDay(date_pub)}</span> {getLocaleMonthDay(date_pub)}</span></span>;
//
//			var post_by = <span>by {this.getAtName(author)}</span>;
//			if ( author.meta['real-name'] ) {
//				post_by = <span>by {author.meta['real-name']} ({this.getAtName(author)})</span>;
//			}
//
//			var post_avatar = this.getAvatar( author );
//			
//			var HasHeadline = null;
//			if ( node.subtype === 'news' ) {
//				HasHeadline = <div class='-headline -news'>NEWS</div>;
//			}
//			else if ( node.subtype === 'event' ) {
//				HasHeadline = <div class='-headline -event'><SVGIcon>trophy</SVGIcon> EVENT</div>;
//			}
			
				
				
//			let HasBody = [];
//			if ( true ) {
//				HasBody.push(
//					<ContentCommonBodyAvatar />
//				);
//				HasBody.push(
//					<ContentCommonBodyTitle href={path}>{node.name}</ContentCommonBodyTitle>
//				);
//				
//				HasBody.push(
//					<ContentCommonBodyMarkup class="-block-if-not-minimized">{node.body}</ContentCommonBodyMarkup>
//				);
//			}
			
			let HasFooter = null;
			if ( true ) {
				let Left = [];
				if ( props['minmax'] ) {
					Left.push(
						<div class="-minmax" onclick={this.onMinMax}>
							<SVGIcon class="-inline-if-not-minimized">arrow-up</SVGIcon>
							<SVGIcon class="-inline-if-minimized">arrow-down</SVGIcon>
						</div>
					);
				}
				
				let Right = [];
				if ( props['love'] )
					Right.push(<ContentFooterButtonLove user={user} node={node} wedge_left_bottom />);
				if ( props['comments'] )
					Right.push(<ContentFooterButtonComments href={path} node={node} wedge_left_bottom />);
				if ( props['star'] )
					Right.push(<ContentFooterButtonStar href={path} node={node} wedge_left_bottom />);
//				if ( props['edit'] )
//					Right.push(<ContentFooterButtonEdit href={path} node={node} wedge_left_bottom />);

				HasFooter = (
					<div class={[
						'content-common-footer', 
						Left.length+Right.length ? '-has-items' : ''
					]}>
						<div class="-left">
							{Left}
						</div>
						<div class="-right">
				  			{Right}
				  		</div>
					</div>
				);
			}

			return (
//				<div class={['content-base','content-common','content-post',HasHeadline ? '-has-headline' : '',minimized ? 'minimized' : '']}>
				<div class={MainClass}>
					{HasHeader}
					{props.children}
					{HasFooter}
				</div>
			);

//					{HasHeadline}
//					<div class="content-common-body">
//						<div class="-avatar" onclick={e => { location.href = "#user-card/"+author.slug; }}>
//							<img src={post_avatar} /><SVGIcon class="-info">info</SVGIcon>
//						</div>
//						<div class="-title _font2">
//							<NavLink href={path} dangerouslySetInnerHTML={dangerousParsedTitle} />
//						</div>
//						<div class="-subtext">
//							Posted {post_relative} {post_by} {post_date}
//						</div>
//					</div>
//					<ContentBodyMarkup class="-block-if-not-minimized">{node.body}</ContentBodyMarkup>
//					<div class="content-footer content-footer-common -footer">
//						<div class="-left">
//							<div class="-minmax" onclick={this.onMinMax}>
//								<SVGIcon class="-inline-if-not-minimized">arrow-up</SVGIcon>
//								<SVGIcon class="-inline-if-minimized">arrow-down</SVGIcon>
//							</div>
//						</div>
//						<div class="-right">
//				  			{RightFooterItems}
//				  		</div>
//					</div>

		}
		else {
			return <ContentLoading />;
		}
	}
}
