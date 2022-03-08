from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Boolean,
    Table,
)
from .base import metadata


user = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("username", String, nullable=False),
    Column("email", String, unique=True, nullable=False),
    Column("number_letter", Integer, nullable=False),
    Column("subscriber", Integer, nullable=False),
    Column("password_hash", String, nullable=False),
    Column("is_superuser", Boolean, nullable=False, default=False)
)


# class User(Base):
#     __tablename__ = 'users'
#
#     id = Column(Integer, primary_key=True)
#     username = Column(String, unique=True, nullable=False)
#     email = Column(String, unique=True, nullable=False)
#     number_letter = Column(Integer)
#     subscriber = Column(Integer)
#     password_hash = Column(String)
list = Table(
    "lists",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, nullable=False),
    Column("date", DateTime),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True, nullable=False)
)


# class List(Base):
#     __tablename__ = 'lists'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String, nullable=False)
#     date = Column(DateTime)
#     user_id = Column(Integer, ForeignKey('users.id'), index=True, nullable=False)
#     user = relationship('User', backref='lists')
contact = Table(
    "contacts",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String),
    Column("email", String, nullable=False),
    Column("phone_number", String(11)),
    Column("date", DateTime, nullable=False),
    Column("list_id", Integer, ForeignKey('lists.id', ondelete="CASCADE"), index=True, nullable=False),
)

# class Contact(Base):
#     __tablename__ = 'contacts'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String)
#     email = Column(String, nullable=False)
#     phone_number = Column(String(11))
#     date = Column(DateTime, nullable=False)
#     list_id = Column(Integer, ForeignKey('lists.id'), index=True, nullable=False)
#     list = relationship('List', backref='contacts')
template = Table(
    "templates",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, nullable=False),
    Column("user_template", Boolean, default=False),
    Column("template", String(200), nullable=False),
    Column("img", String(200), nullable=False)
)

# class Template(Base):
#     __tablename__ = 'templates'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String, nullable=False)
#     user_template = Column(Boolean, default=False)
    # template = File???
tag = Table(
    "tags",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, unique=True, nullable=False)
)

# class Tag(Base):
#     __tablename__ = 'tags'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String, unique=True, nullable=False)
template_tag = Table(
    "template_tags",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("template_id", Integer, ForeignKey('templates.id', ondelete="CASCADE"), index=True),
    Column("tag_id", Integer, ForeignKey('tags.id'), index=True)
)


# class TemplateTag(Base):
#     __tablename__ = 'template_tags'
#
#     id = Column(Integer, primary_key=True)
#     template_id = Column(Integer, ForeignKey('templates.id'), index=True)
#     tag_id = Column(Integer, ForeignKey('tags.id'), index=True)
#     template = relationship('Template', backref='template_tag')
#     tag = relationship('Tag', backref='template_tags')
user_template = Table(
    "user_templates",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True, nullable=False),
    Column("template_id", Integer, ForeignKey('templates.id', ondelete="CASCADE"), index=True, nullable=False)
)

# class UserTemplate(Base):
#     __tablename__ = 'user_templates'
#
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'), index=True)
#     template_id = Column(Integer, ForeignKey('templates.id'), index=True)
#     user = relationship('User', backref="user_templates")
#     template = relationship('Template', backref="user_templates")
mailing = Table(
    "mailings",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("title", String),
    Column("organisation", String),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True),
    Column("template_id", Integer, ForeignKey('templates.id'), index=True),
    Column("list_id", Integer, ForeignKey('lists.id'), index=True),
    Column("date", DateTime),
    Column("email", String),
    Column("sent", Integer),
    Column("delivery", Integer),
    Column("read", Integer),
    Column("transition", Integer),
    Column("unfollow", Integer),
    Column("spam", Integer)
)

# class Mailing(Base):
#     __tablename__ = 'mailings'
#
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'), index=True)
#     template_id = Column(Integer, ForeignKey('templates.id'), index=True)
#     list_id = Column(Integer, ForeignKey('lists.id'), index=True)
#     date = Column(DateTime)
#     sent = Column(Integer)
#     delivery = Column(Integer)
#     read = Column(Integer)
#     transition = Column(Integer)
#     unfollow = Column(Integer)
#     spam = Column(Integer)
#     user = relationship('User', backref="mailings")
#     template = relationship('Template', backref="mailings")
#     list = relationship('List', backref="mailings")
#

user_image = Table(
    "user_images",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True),
    Column("img", String(200), nullable=False)
)
