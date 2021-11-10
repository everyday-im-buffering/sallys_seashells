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
    
            <div>
            <h1>{singleShell.name}</h1>
            <li>{singleShell.marineType}</li>
            <li>{singleShell.color}</li>
            <li>{singleShell.pattern}</li>
            <li>{singleShell.price}</li>
            </div>

        
            
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