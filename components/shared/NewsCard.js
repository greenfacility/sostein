import { Avatar, Card, List } from 'antd';

import PropTypes from 'prop-types';

const NewsCard = ({ feed, title, subtitle }) => (
  <Card title={title} extra={<small>{subtitle}</small>} className="mb-4">
    <List
      itemLayout="horizontal"
      dataSource={feed}
      renderItem={item => (
        <List.Item className="border-bottom-0">
          <List.Item.Meta
            avatar={
              item.avatar ? (
                item.avatar
              ) : (
                <Avatar
                  size={48}
                  style={{
                    color: 'rgb(143, 0, 245)',
                    backgroundColor: 'rgb(214, 207, 253)'
                  }}
                >
                  {item.subject.charAt(0)}
                </Avatar>
              )
            }
            title={
              <a href="javascript:;" className="text-truncate">
                {item.subject}
              </a>
            }
            description={<span className="text-truncate">{item.message}</span>}
          />
        </List.Item>
      )}
    />
  </Card>
);

NewsCard.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      avatar: PropTypes.element,
      subject: PropTypes.string,
      message: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default NewsCard;
