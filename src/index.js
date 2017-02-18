const GitBook = require('gitbook-core');
const { React } = GitBook;

/**
 * Ga wrapper to track page view.
 * @type {ReactClass}
 */
let GAWrapper = React.createClass({
    propTypes: {
        children: React.PropTypes.node.isRequired,
        config:   GitBook.PropTypes.map.isRequired,
        location: GitBook.PropTypes.Location.isRequired
    },

    componentDidMount() {
        const { config } = this.props;

        // Load ga
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        // Initialize ga
        ga('create', cfg.get('token'), cfg.get('configuration'));
    },

    componentDidUpdate(prevProps) {
        const hasChanged = prevProps.location != this.props.location;

        if (hasChanged) {
            ga('send', 'pageview', window.location.pathname + window.location.search);
        }
    },

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
});
GAWrapper = GitBook.connect(
    ({ history, config }) => ({
        location: history.location,
        config: config.getForPlugin('ga')
    }),
    GAWrapper
);

module.exports = GitBook.createPlugin({
    activate: (dispatch, getState, { Components }) => {
        dispatch(Components.registerComponent(GAWrapper, { role: 'website:body' }));
    }
});
