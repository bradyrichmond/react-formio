var React = require('react');
var valueMixin = require('./mixins/valueMixin.jsx');
var FormioComponent = require('../FormioComponent.jsx');

module.exports = React.createClass({
  displayName: 'Container',
  mixins: [valueMixin],
  getInitialValue: function() {
    return {};
  },
  elementChange: function(component) {
    var value = this.state.value;
    value[component.props.component.key] = component.state.value;
    this.setState({
      value: value
    });
    this.props.onChange(this);
  },
  getElements: function() {
    var classLabel = 'control-label' + ( this.props.component.validate && this.props.component.validate.required ? ' field-required' : '');
    var inputLabel = (this.props.component.label && !this.props.component.hideLabel ?
      <label htmlFor={this.props.component.key} className={classLabel}>{this.props.component.label}</label> : '');
    return (
      <div className='formio-container'>
        {this.props.component.components.map(function(component) {
          var value = (this.state.value && this.state.value.hasOwnProperty(component.key) ? this.state.value[component.key] : component.defaultValue || '');
          var key = (component.key) ? component.key : component.type;
          return (
            <div key={key}>
              <FormioComponent
                {...this.props}
                key={key}
                name={component.key}
                component={component}
                onChange={this.elementChange}
                value={value}
              />
            </div>
          );
        }.bind(this))}
      </div>
    );
  }
});