import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
});

function TermsAndConditions(props) {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={24} justify='center'>
        <Grid item xs={10}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h1" component="h3">
              MARVL Terms and Conditions
            </Typography>
            <Typography variant="h5" component="h3">
              1.  DEFINITIONS
            </Typography>
            <Typography variant="h6" component="h3">
                A.  Parties
            </Typography>
            <Typography component="p">
                "You" and "your" refer to you, as a user of the Site (MARVL). A "user" is someone who accesses, browses, leaves reviews, etc.. "We," "us," and "our" refer to CPA (the Community Purchasing Alliance).
            </Typography>
            <Typography variant="h6" component="h3">
                B.  Content
            </Typography>
            <Typography component="p">
              "Your Content" means Content that you submit or transmit to, through, or in connection with the Site, such as ratings, reviews, information that you publicly display or displayed in your account profile.
            </Typography>
            <Typography variant="h5" component="h3">
              2.  USING THE SITE
            </Typography>
            <Typography variant="h6" component="h3">
              A.  Eligibility
            </Typography>
            <Typography component="p">
              To access or use the Site, you must be 18 years or older and be an employee of a DC Charter School with a valid DC Charter School email suffix. Employees, board members and consultants for CPA are also eligible to access the Site.
            </Typography>
            <Typography variant="h6" component="h3">
              B.  Permission to Use the Site
            </Typography>
            <Typography component="p">
              We grant you permission to use the Site subject to the restrictions in these Terms. Your use of the Site is at your own risk, including the risk that you might be exposed to Content that is offensive, indecent, inaccurate, objectionable, or otherwise inappropriate.
            </Typography>
            <Typography variant="h6" component="h3">
              C.  Site Availability
            </Typography>
            <Typography component="p">
              The Site may be modified, updated, interrupted, suspended or discontinued at any time without notice or liability.
            </Typography>
            <Typography variant="h6" component="h3">
              D.  User Accounts
            </Typography>
            <Typography component="p">
              You must create an account and provide certain information about yourself in order to use some of the features that are offered through the Site. You are responsible for maintaining the confidentiality of your account password. You are also responsible for all activities that occur in connection with your account.
            </Typography>
            <Typography variant="h6" component="h3">
              E.  Communications from CPA and other Users
            </Typography>
            <Typography component="p">
              By creating an account, you agree to receive certain communications in connection with the Site. For example, you may receive communication from CPA asking you to update your reviews to ensure they’re still accurate. You may also receive emails from other charter school leaders to hear more information about a review you leave.
            </Typography>
            <Typography variant="h5" component="h3">
              3.  CONTENT
            </Typography>
            <Typography variant="h6" component="h3">
              A.  Responsibility for Your Content
            </Typography>
            <Typography component="p">
              You alone are responsible for Your Content. You assume all risks associated with Your Content, including anyone’s reliance on its quality, accuracy, or reliability, or any disclosure by you of information in Your Content that makes you personally identifiable. You are solely responsible for the content of your reviews and for editing/reviewing them to ensure they reflect your sentiments.
            </Typography>
            <Typography variant="h5" component="h3">
              4.  INDEMNITY
            </Typography>
            <Typography component="p">
              You  agree  to indemnify and hold harmless CPA and CPA’s subsidiaries, affiliates, officers, directors, agents, employees, partners and licensors from any claim or demand, including reasonable attorneys’ fees, made by any third party due to or arising out of the indemnifying party’s breach of any representation, warranty, covenant and/or agreement contained herein.
            </Typography>
            <Typography variant="h5" component="h3">
              5.  LIMITATION OF LIABILITY
            </Typography>
            <Typography component="p">
              The User expressly understands and agrees that CPA shall not be liable to the User for any direct, indirect, incidental, special, consequential or exemplary damages resulting from (i) the delivery of Services by a CPA Partner to the User, including, without limitation, the cost of procurement of substitute services or products resulting from inadequate, insufficient, incomplete or otherwise deficient Services delivered to the User, (ii) the User’s use of or inability to use any Services delivered by a CPA Partner, or (iii) any other matter relating to the Services.
            </Typography>
            <Typography variant="h5" component="h3">
              6.  DISPUTE RESOLUTION
            </Typography>
            <Typography component="p">
              No party shall initiate any claim and/or proceeding without first making a good-faith attempt to resolve the dispute that would be the subject matter of the claim or proceeding through negotiation and if negotiations fail, through mediation.
            </Typography>
            <Typography variant="h5" component="h3">
              7.  GENERAL TERMS
            </Typography>
            <Typography component="p">
              A.  CPA controls access to charter school staff but we cannot control the actions of users.
            </Typography>
            <Typography component="p">
              B.  We will do everything we can do to keep your information private but we ask you to use your discretion when sharing information.
            </Typography>
            <Typography component="p">
              C.  CPA will not share this information with vendors.
            </Typography>
            <Typography component="p">
              D.  CPA has built this tool to encourage an online community that will help you find good vendors that will serve your schools well.
            </Typography>
            <Typography component="p">
              E.  We reserve the right to modify, update, or discontinue the Site at our sole discretion, at any time, for any or no reason, and without notice or liability.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

TermsAndConditions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TermsAndConditions);
