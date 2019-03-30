import React, {Component} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Header, HeaderProps } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

interface NavHeaderProps extends HeaderProps {
    withBackButton?: boolean;
    onPressBack: () => void;
}

export default class NavHeader extends Component<NavHeaderProps> {

    render() {
        return(
            <Header
                leftComponent={this.props.withBackButton ? 
                    <TouchableOpacity onPress={this.props.onPressBack}>
                        <Icon name={"md-arrow-back"} size={20} color={'#fff'}/>
                    </TouchableOpacity>
                    :
                    this.props.leftComponent}
                rightComponent={this.props.rightComponent}
                centerComponent={this.props.centerComponent}
            />
        );
    }
}