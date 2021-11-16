let host = "https://react-vinapage.blogspot.com/", start = 1, maxResult = 10, label = "";
function getLinkImageFromContent(content) { let s = content; let a = s.indexOf('<img'); let b = s.indexOf('src="', a); let c = s.indexOf('"', b + 5); return s.substr(b + 5, c - b - 5); }
function getLinkFromLinks(links) { for (let i = 0; i < links.length; i++) { if (links[i].type == "text/html") { return links[i].href.replaceAll("#comment-form", ""); } } return ""; }

function getPostId() { let atom = document.querySelectorAll("meta[property='postId']"); for (let i = 0; i < atom.length; i++) { let id = atom[i].getAttribute("content"); if (id) { return id; } } return "0"; }

function getValueCodeFromContent(content, beginCode, endCode) { return (-1 != content.indexOf(beginCode) ? content.substring(content.indexOf(beginCode) + beginCode.length, content.indexOf(endCode)) : ""); }


class DetailPost extends React.Component {
    constructor(props) { super(props); this.state = { data: null }; }
    componentWillMount() {
        let url = host + "feeds/posts/default/" + this.props.id + "?alt=json";
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data.entry });
        };
        xhr.send();
    }
    render() {
        let title = '';
        let content = '';
        let img = '';
        if (this.state.data) {
            title = this.state.data.title.$t;
            content = this.state.data.content.$t;
            //var labels = this.state.data.category;
            img = getLinkImageFromContent(content);
        }
        return this.state.data != null ? <div className="detail-post"><h1>{title}</h1><div ><div className="img"><img src={img} alt="{this.props.title}" loading="lazy" /></div><div className="desc"><p>{getValueCodeFromContent(content, "[description]", "[/description]")}</p></div></div></div> : <div>Loading...</div>;
    }
}

class ItemPost extends React.Component {
    render() {
        let img = getLinkImageFromContent(this.props.content);
        return <div className="item-post"><a href={this.props.link} ><img src={img} alt="{this.props.title}" loading="lazy" /><h3>{this.props.title}</h3></a></div>;
    }
}
class ItemPosts extends React.Component {
    render() {
        const itemNodes = this.props.data.length < 1 ? <div> loading...</div> : this.props.data.map(item => (<ItemPost title={item.title.$t} key={item.id.$t} content={item.content.$t} link={getLinkFromLinks(item.link)} />
        )); return <div className="itemList">{itemNodes}</div>;
    }
}
class DataBlogger extends React.Component {
    constructor(props) { super(props); this.state = { data: [] }; }
    componentWillMount() {
        let link = window.location.href;
        let url = this.props.url;
        if (link != host) { if (link.indexOf("/search/label") > -1) { url = link; } }
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => { const data = JSON.parse(xhr.responseText); this.setState({ data: data.feed.entry }); };
        xhr.send();
    }
    render() {
        let link = window.location.href;
        let pageRender = <div>Loading...</div>;
        let postId = getPostId();
        if (link.indexOf('?') > -1) link = link.split('?')[0];
        if (link == host) { pageRender = <ItemPosts data={this.state.data} />; }
        else { if (link.indexOf("/search/label") > -1) { pageRender = <ItemPosts data={this.state.data} />; } else { pageRender = <DetailPost id={postId} />; } }
        return <div><a href="/">Trang chủ</a><hr />{pageRender}<hr /><a href="//vinapage.vn">by VinaPage.vn</a></div>;
    }
}

ReactDOM.render(<DataBlogger url="https://react-vinapage.blogspot.com/feeds/posts/default/-/Sản phẩm?start-index=1&amp;max-results=10&amp;orderby=published&amp;alt=json"  />, document.getElementById('app'),);
