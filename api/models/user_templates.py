from typing import Optional
from pydantic import BaseModel


class UserTemplates(BaseModel):
    id: Optional[int]
    user_id: int
    template_id: int