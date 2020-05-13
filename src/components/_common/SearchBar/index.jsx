import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import PageSection from '../PageSection';

const SearchBar = ({ onSearchChange }) => (
  <PageSection>
    <Form style={{ padding: '24px' }}>
      <Form.Item label="Busca" name="search" style={{ marginBottom: 0 }}>
        <Input onChange={onSearchChange} />
      </Form.Item>
    </Form>
  </PageSection>
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
