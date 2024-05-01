from dagster import DynamicPartitionsDefinition

user_partitions_def = DynamicPartitionsDefinition(name="users")
