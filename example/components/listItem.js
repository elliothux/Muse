
import {Muse} from '../../index';


class ListItem extends Muse {
    render() {
        return (
            <li>{this.props.text}</li>
        )
    }
}


export default ListItem;
