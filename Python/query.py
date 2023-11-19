import cohere
import config
co = cohere.Client(config.api_key)


text_input = input("What is the prompt to summarize? ")
response = co.summarize(
    text=text_input,
    model='command',
    length='short',
    format='bullets',
    extractiveness='medium'
)

summary = response.summary

print(summary)
