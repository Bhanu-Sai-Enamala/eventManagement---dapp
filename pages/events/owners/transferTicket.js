import React, { Component } from 'react' ;
import {Form,Button,Input,Message} from 'semantic-ui-react';
import Layout from '../../../components/layout';
import event from '../../../ethereum/event';
import Event from '../../../ethereum/event';
import web3 from '../../../ethereum/web3';
import {Router,Link} from '../../../routes';

class EventNew extends Component {
    static async getInitialProps(props) {
        
        
        
        return{
            
            contractAddress: props.query.address
        };
    }
    state = {
        ticketId: '',
        newOwner:'',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) =>  {
        event.preventDefault();
        this.setState({loading:true,errorMessage:''});
        const eventInstance = Event(this.props.contractAddress);
        try {
            const accounts = await web3.eth.getAccounts();
            await eventInstance.methods
                .transferTicket(this.state.ticketId,this.state.newOwner)
                .send({
                        from:accounts[0]
                    });
                    Router.pushRoute(`/events/${this.props.contractAddress}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading:false});
    };

    render() {
        return (
            <Layout>
                <h3>Refund a Ticket</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    
                    <Form.Field>
                        <label>Ticket Id</label>
                        <Input
                            value={this.state.ticketId}
                            onChange={event => this.setState({ ticketId: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>New Owner Address</label>
                        <Input
                            value={this.state.newOwner}
                            onChange={event => this.setState({ newOwner: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Transfer!</Button>
                </Form>
            </Layout>
        );
    }
}

export default EventNew