import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Tooltip, Icon, message } from "antd"
import Copy from "copy-to-clipboard"

import utils_slots from "../utils/slots"

const limitLength = utils_slots.limitLength
class LimitText extends Component {
    state = {
        placement: "",
        title: "",
        link: "",
        length: 15,
        target: "",
        copy: "",
    }
    componentDidMount = () => {
        try {
            const { placement="top", title, link, length=15, target, copy="", } = this.props;
            this.setState({
                placement,
                title,
                link,
                length,
                target,
                copy,
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    copyClick = async () => {
        try {
            const { title, copy } = this.state
            await Copy(title)
            message.success(`复制${copy}成功`)
        } catch (e) {
            console.log(e.message)
        }
    }
    render () {
        const { placement, title, link, length, target, copy, } = this.state
        return (
            <Tooltip placement={placement} title={title} overlayStyle={{wordWrap: 'break-word'}}>
                {
                    link ? 
                    <Link to={link + title} target={target}>
                        {limitLength(title, length)} 
                    </Link>
                    : 
                    <span>{limitLength(title, length)}</span>
                }
                {
                   copy && <Icon type="copy" style={{marginLeft: 5}} title={`复制${copy}`} onClick={this.copyClick} />
                }
            </Tooltip>
        ); 
    }
}
export default LimitText