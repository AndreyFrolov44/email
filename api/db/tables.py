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

list = Table(
    "lists",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, nullable=False),
    Column("date", DateTime),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True, nullable=False)
)

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

template = Table(
    "templates",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, nullable=False),
    Column("user_template", Boolean, default=False),
    Column("template", String(200), nullable=False),
    Column("img", String(200), nullable=False),
    Column("rows", String, nullable=False)
)

tag = Table(
    "tags",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("name", String, unique=True, nullable=False)
)

template_tag = Table(
    "template_tags",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("template_id", Integer, ForeignKey('templates.id', ondelete="CASCADE"), index=True),
    Column("tag_id", Integer, ForeignKey('tags.id'), index=True)
)

user_template = Table(
    "user_templates",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True, nullable=False),
    Column("template_id", Integer, ForeignKey('templates.id', ondelete="CASCADE"), index=True, nullable=False)
)

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

mailing_contact = Table(
    "mailing_contacts",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("mailing_id", Integer, ForeignKey('mailings.id', ondelete="CASCADE"), index=True),
    Column("contact_id", Integer, ForeignKey('contacts.id', ondelete="CASCADE"), index=True),
    Column("uuid", String, unique=True, index=True),
    Column("read", Boolean, default=False),
    Column("transition", Boolean, default=False),
    Column("unfollow", Boolean, default=False),
    Column("spam", Boolean, default=False)
)

user_image = Table(
    "user_images",
    metadata,
    Column("id", Integer, primary_key=True, unique=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete="CASCADE"), index=True),
    Column("img", String(200), nullable=False)
)
