import React from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`/* ... */`
const Paragraph = styled.p`/* ... */`
const Button = styled.button`/* ... */`
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }

  increment() {
    let {count} = this.state;
    this.setState({
      count: ++count
    })
  }

  decrement() {
    let {count} = this.state;
    this.setState({
      count: --count,
    })
  }

  render(){
    return (
      <StyledCounter>
        <Paragraph>{ this.state.count }</Paragraph>
        <Button onClick={()=>this.increment()}>+</Button>
        <Button onClick={()=>this.decrement()}>-</Button>
      </StyledCounter>
    )
  }
}

export default Counter;