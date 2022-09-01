from .tables import (
    user,
    list,
    contact,
    template,
    tag,
    template_tag,
    user_template,
    mailing,
    mailing_contact,
    user_image
)
from .base import metadata, engine


def init_db():
    metadata.create_all(engine)
