'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var ModalTrigger = Bootstrap.ModalTrigger;

//var Actions = require('actions/xxx')

require('styles/EditPage.less');

var EditPage = React.createClass({

  render() {
    return (
        <div>
          <p>Content for EditPage</p>
          <ModalTrigger modal={<Modal title='modal!'> <div className='modal-body'><p>This is a Modal.</p></div> </Modal>}>
            <Button>Show modal</Button>
          </ModalTrigger>
        </div>
      );
  }
});

module.exports = EditPage;

