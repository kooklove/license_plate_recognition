import PropTypes from 'prop-types';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppAlpr } from '../sections/@dashboard/app';

DashboardApp.propTypes = {
  request: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function DashboardApp(props) {
  return (
    <Page title="Dashboard" style={{ position: 'relative', height: '100%' }}>
      <Container maxWidth="xl" style={{ border: '0px solid blue', height: '100%' }}>
        <AppAlpr
          title="ALPR Preview"
          subheader="Realtime Video Streaming"
          request={props.request}
        />
      </Container>
    </Page>
  );
}
