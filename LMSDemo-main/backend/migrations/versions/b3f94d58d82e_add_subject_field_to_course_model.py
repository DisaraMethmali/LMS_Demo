"""Add subject field to Course model

Revision ID: b3f94d58d82e
Revises: 729b9c4738e9
Create Date: 2025-01-04 01:21:31.591528

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b3f94d58d82e'
down_revision = '729b9c4738e9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('subject', sa.String(length=100), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.drop_column('subject')

    # ### end Alembic commands ###
