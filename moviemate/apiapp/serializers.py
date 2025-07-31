from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ['user', 'added_on']

    def validate(self, data):
        movie_type = data.get('type', self.instance.type if self.instance else None)
        total_episodes = data.get('total_episodes', self.instance.total_episodes if self.instance else None)
        episodes_watched = data.get('episodes_watched', self.instance.episodes_watched if self.instance else None)

        if movie_type == 'movie':
            if total_episodes or episodes_watched:
                raise serializers.ValidationError({
                    'episodes': 'Episodes info should not be provided for type "movie".'
                })

        elif movie_type == 'tvshow':
            if total_episodes is None:
                raise serializers.ValidationError({
                    'total_episodes': 'This field is required for TV shows.'
                })
            if episodes_watched is None:
                raise serializers.ValidationError({
                    'episodes_watched': 'This field is required for TV shows.'
                })

        else:
            raise serializers.ValidationError({
                'type': 'Invalid type. Should be "movie" or "tvshow".'
            })

        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
