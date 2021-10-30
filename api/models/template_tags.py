from typing import Optional
from pydantic import BaseModel


class TemplateTag(BaseModel):
    id: Optional[int]
    template_id: int
    tag_id: int