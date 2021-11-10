import React from 'react';
import {useEffect, useState} from 'react';
import { fetchSingleShell } from '../store/singleShell';
import {connect} from 'react-redux'

 class SingleShell extends React.Component {


    componentDidMount(){
        try{
            const id = this.props.match.params.id
            this.props.loadSingleShell(id)
        }catch(err){
            console.log(err)
        }
       
       
   
    }
    
    render(){
        const singleShell = this.props.singleShell
        console.log(singleShell)
        return (
    
            // <div>{singleShell.color}</div>
            <div>hi</div>
            
        )
    }


}


const mapState = (state) => {
    return {
        singleShell: state.singleShell
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadSingleShell: (id) => dispatch(fetchSingleShell(id))
    }
}

export default connect(mapState, mapDispatch)(SingleShell)