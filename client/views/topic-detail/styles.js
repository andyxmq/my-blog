export const topicDetailStyle = {
  header: {
    padding: 20,
    boderBottom: '1px solid #dfdfdf',
    '& h3': {
      margin: 0,
    },
  },
  body: {
    padding: 0,
    '& img': {
      maxWidth: '100%',
    },
    '& ul, & ol': {
      paddingLeft: 30,
      '& li': {
        marginBottom: 7,
      },
    },
  },
  replyHeader: {
    padding: '10px 20px',
    // backgroundColor: theme.palette.primary[500],
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  },
  replyBody: {
    padding: 20,
  },
  replies: {
    margin: '0 24px',
    marginBottom: 24,
  },
  notLoginButton: {
    textAlign: 'center',
    padding: '20px 0',
  },
};

export const replyStyle = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 0,
    boderBottom: '1px solid #dfdfdf',
  },
  left: {
    marginRight: 20,
  },
  right: {
    '& img': {
      maxWidth: '100%',
      display: 'block',
    },
  },
};

export default topicDetailStyle;
